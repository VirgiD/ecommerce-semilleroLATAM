package com.semillero.mvppuntoorganico.controladores;

import javax.servlet.http.HttpSession;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.semillero.mvppuntoorganico.entidades.Usuario;

@Controller
@RequestMapping("/")

public class PortalControladores {

    @GetMapping("/")
    public String index(){
        return "index.html";
    }
    
    @GetMapping("/quienessomos")
    public String quienessomos() {
        return "quienes_somos";
    }
    
//    Metodo en caso de generar mas roles 
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/inicio")
    public String inicio(HttpSession session, ModelMap modelo) {

        Usuario usuarioLogueado = (Usuario) session.getAttribute("usuarioSesion");
        modelo.put("usuario", usuarioLogueado);

        return "redirect:/productos_editar";
    }
    
    @GetMapping("/login")
    public String login(@RequestParam(required = false) String error, ModelMap model) {
        if (error != null) {
            model.put("error", "Usuario o contraseña incorrectos!");
        }
        return "login";
    }
    
	@GetMapping("/registrar")
	public String registrar() {
    return "usuario_form.html";
	}
}
