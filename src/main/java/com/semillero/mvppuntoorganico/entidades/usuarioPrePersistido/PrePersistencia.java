package com.semillero.mvppuntoorganico.entidades.usuarioPrePersistido;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.semillero.mvppuntoorganico.entidades.Usuario;
import com.semillero.mvppuntoorganico.enumeraciones.Rol;
import com.semillero.mvppuntoorganico.repositorios.UsuarioRepositorio;

@Service
public class PrePersistencia implements CommandLineRunner {

	@Autowired
	private UsuarioRepositorio usuarioRepositorio;

	@Value("${cust.data.nombre}")
	private String nombre;
	@Value("${cust.data.password}")
	private String pass;

	@Override
	public void run(String... args) throws Exception {

		Optional<Usuario> u = Optional.ofNullable(usuarioRepositorio.buscarPorNombre(nombre));
		if (!u.isPresent()) {
			Usuario userAdmin = new Usuario();
			userAdmin.setNombre(nombre);
			userAdmin.setContrasena(new BCryptPasswordEncoder().encode(pass));
			userAdmin.setRol(Rol.ADMIN);
			usuarioRepositorio.save(userAdmin);
		}
	}
}
