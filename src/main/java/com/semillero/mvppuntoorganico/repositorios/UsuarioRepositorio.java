package com.semillero.mvppuntoorganico.repositorios;

import com.semillero.mvppuntoorganico.entidades.Producto;
import com.semillero.mvppuntoorganico.entidades.Usuario;
import com.semillero.mvppuntoorganico.enumeraciones.Rol;
import org.springframework.data.annotation.Id;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, String> {

	@Query("SELECT u FROM Usuario u WHERE u.id = :id")

	public Usuario buscarPorId(@Param("id") String id);

	@Query("SELECT u FROM Usuario u WHERE u.nombre = :nombre")

	public Usuario buscarPorNombre(@Param("nombre") String nombre);

	@Query("SELECT u FROM Usuario u WHERE u.email = :email")
	public Usuario buscarPorEmail(@Param("email") String email);
	
	@Query("SELECT u FROM Usuario u WHERE u.nombre LIKE %?1%"
            + "OR u.email LIKE %?1%"
            + "OR u.id LIKE %?1%")
    public List<Usuario> findAllByParams (String nombre);

	public List<Usuario> findByRol(Rol rol);

	List<Usuario> findByEliminadoFalse();

	Optional<Usuario> findByIdAndEliminadoFalse(String id);
}
