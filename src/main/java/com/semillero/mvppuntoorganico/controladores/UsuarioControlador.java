package com.semillero.mvppuntoorganico.controladores;

import com.semillero.mvppuntoorganico.entidades.Usuario;
import com.semillero.mvppuntoorganico.excepciones.MiException;
import com.semillero.mvppuntoorganico.repositorios.UsuarioRepositorio;
import com.semillero.mvppuntoorganico.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/usuario")
public class UsuarioControlador {

	@Autowired
	private UsuarioRepositorio usuarioRepositorio;
	
	@Autowired
	private UsuarioServicio usuarioServicio;
	
	@GetMapping("/registrar") 
	public String cargarUsuario() {
		return "usuario_form";
	}

	@PostMapping("/registro")
	public String registrarUsuario(@RequestParam String nombre, @RequestParam String email,
			@RequestParam String contrasena, String contrasena2, ModelMap modelo) {
		try {
			usuarioServicio.crearUsuario(nombre, email, contrasena, contrasena2);
			modelo.put("exito", "el usuario fue cargado correctamente");
			return "usuario_list";

		} catch (MiException ex) {

			modelo.put("error", ex.getMessage());
			modelo.put("nombre", nombre);
			modelo.put("email", email);
			modelo.put("contrasena", contrasena);
			return "usuario_form";
		}

	}

	@GetMapping("/lista")
	public String listar(ModelMap model,@Param("palabraClave") String palabraClave) {
		List<Usuario> usuario = new ArrayList<>(); 
        if (palabraClave !=null && !palabraClave.isEmpty()) {
            model.addAttribute("palabraClave", palabraClave);
            usuario=usuarioServicio.ListAll(palabraClave);
           
        }else{
             usuario = usuarioServicio.listarUsuarios();
        }
        model.addAttribute("usuarios", usuario);
        return "usuario_list";
	}

	@GetMapping("/modificar/{id}")
	public String modificar(@PathVariable String id,HttpSession session, ModelMap modelo) {
		modelo.put("usuario", usuarioServicio.getOne(id));
		return "usuario_modificar.html";

	}

	@PostMapping("/modificarform/{id}")
	public String modificar(@PathVariable String id ,@RequestParam String nombre,@RequestParam String email,@RequestParam String contrasena, 
			String contrasena2, ModelMap modelo) throws MiException {
		try {
			usuarioServicio.modificarUsuario(id, nombre, email, contrasena, contrasena2);
			modelo.put("exito", "el usuario fue modificado correctamente");
			return "redirect:/usuario/lista";
		} catch (MiException ex) {
			modelo.put("error", ex.getMessage());
			modelo.put("nombre", nombre);
			modelo.put("email", email);
			modelo.put("contrasena", contrasena);
			return "usuario_modificar";
		}
	}
	
	@GetMapping("/eliminar/{id}")
    public String eliminar(@PathVariable String id, ModelMap modelo) {
        usuarioServicio.eliminarUsuario(id);
        return "redirect:/usuario/lista";
    }
	
}
