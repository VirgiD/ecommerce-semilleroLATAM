package com.semillero.mvppuntoorganico;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.semillero.mvppuntoorganico.entidades.Usuario;
import com.semillero.mvppuntoorganico.repositorios.UsuarioRepositorio;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SeguridadWeb implements UserDetailsService {

	@Autowired
	public UsuarioRepositorio usuarioRepository;

	@Bean
	 BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeRequests(authorizeRequests ->
                authorizeRequests
                    .antMatchers("/Usuario/*").hasRole("ADMIN")
                    .antMatchers("/css/*", "/js/*", "/img/*", "/**").permitAll()
            )
            .formLogin()
            .loginPage("/login")
            .loginProcessingUrl("/logincheck")
            .usernameParameter("nombre")
            .passwordParameter("contrasena")
            .defaultSuccessUrl("/productos/editar")
            .permitAll()
            .and()
            .logout(logout -> 
                logout
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("/login")
            )
            .csrf().disable(); 
        return http.build();
    }

	@Override
	public UserDetails loadUserByUsername(String nombre) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepository.buscarPorNombre(nombre);

		if (usuario != null) {
			List<GrantedAuthority> permisos = new ArrayList<>();

			GrantedAuthority p = new SimpleGrantedAuthority("ROLE_" + usuario.getRol().toString());

			permisos.add(p);

			ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();

			HttpSession sesion = attr.getRequest().getSession(true);

			sesion.setAttribute("usuarioSession", usuario);

			return new User(usuario.getNombre(), usuario.getContrasena(), permisos);
		} else {
			throw new UsernameNotFoundException("Usuario no encontrado: " + usuario.getNombre());
		}
	}
}