package com.semillero.mvppuntoorganico.repositorios;

import com.semillero.mvppuntoorganico.entidades.Producto;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepositorio extends JpaRepository<Producto, String> {

    @Query("SELECT p FROM Producto p WHERE p.nombre = :nombre")
    public Producto buscarPorNombre(@Param("nombre") String nombre);
    
    @Query("SELECT p FROM Producto p WHERE p.nombre LIKE %?1%"
            + "OR p.nombre LIKE %?1%")
    public List<Producto> findAllByParams (String nombre);
     
    List<Producto> findByEliminadoFalse();
    Optional<Producto> findByIdAndEliminadoFalse(String id);
}

