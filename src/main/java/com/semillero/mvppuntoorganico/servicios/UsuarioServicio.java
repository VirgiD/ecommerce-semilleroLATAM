package com.semillero.mvppuntoorganico.servicios;

import com.semillero.mvppuntoorganico.entidades.Usuario;
import com.semillero.mvppuntoorganico.enumeraciones.Rol;
import com.semillero.mvppuntoorganico.excepciones.MiException;
import com.semillero.mvppuntoorganico.repositorios.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServicio {
	@Autowired
	private UsuarioRepositorio usuarioRepositorio;

	@Transactional
	public void crearUsuario(String nombre, String email, String contrasena, String contrasena2) throws MiException {

		validar(nombre, email, contrasena);
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(contrasena);

		Usuario usuario = new Usuario();

		usuario.setNombre(nombre);
		usuario.setEmail(email);
		usuario.setContrasena(hashedPassword);
		if (!contrasena.equals(contrasena2)) {
			throw new MiException("Las contraseñas ingresadas deben ser iguales");
		}
		usuario.setRol(Rol.ADMIN);
		usuarioRepositorio.save(usuario);
	}

	@Transactional
	public List<Usuario> listarUsuarios() {
		return usuarioRepositorio.findByEliminadoFalse();
	}

	public Usuario buscarProveedorPorId(String id) {
		return usuarioRepositorio.findByIdAndEliminadoFalse(id).orElse(null);
	}

	@Transactional
	public void modificarUsuario(String id, String nombre, String email, String contrasena, String contrasena2)
			throws MiException {

		validar(nombre, email, contrasena);
		Optional<Usuario> respuesta = usuarioRepositorio.findById(id);
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(contrasena);

		if (respuesta.isPresent()) {

			Usuario usuario = respuesta.get();
			usuario.setNombre(nombre);
			usuario.setEmail(email);
			usuario.setContrasena(hashedPassword);
			if (!contrasena.equals(contrasena2)) {
				throw new MiException("Las contraseñas ingresadas deben ser iguales");
			}
			usuarioRepositorio.save(usuario);
		}
	}

	@Transactional
	public void eliminarUsuario(String id) {
		Usuario usuario = usuarioRepositorio.findByIdAndEliminadoFalse(id).orElse(null);
		if (usuario != null) {
			usuario.setEliminado(true);
			usuarioRepositorio.save(usuario);
		}
	}

	private void validar(String nombre, String email, String contrasena) throws MiException {
//        if (nombre.isEmpty() || nombre == null || nombre.length() < 4 || nombre.matches("^([A-Z]{1}[a-záéíóú]+[ ]?){1,3}$") == false) {
//            throw new MiException("Ingrese un NOMBRE VÁLIDO con al menos de 4 letras");
//        }
//        if (email.isEmpty() || email == null || email.matches("^[\\w-]+(\\.[\\w-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$") == false) {
//            throw new MiException("Ingrese un MAIL VÁLIDO");
//        }
//        if (contrasena.isEmpty() || contrasena == null || contrasena.matches("^[A-Za-z0-9]{8,}$") == false) {
//            throw new MiException("Ingresa una contraseña VÁLIDA de al menos 8 caracteres. Puede utilizar números y/o letras");
//        }
	}

	public Usuario getOne(String id) {
		return usuarioRepositorio.getOne(id);
	}

	public List<Usuario> ListAll(String palabraClave) {
		if (palabraClave != null) {
			return usuarioRepositorio.findAllByParams(palabraClave);
		}
		return usuarioRepositorio.findAll();
	}

	@Service
	public class PrePersistencia implements CommandLineRunner {

		@Value("${cust.data.nombre}")
		private String nombre;
		@Value("${cust.data.password}")
		private String pass;

		@Override
		public void run(String... arg) throws Exception {
		}
	}
}
