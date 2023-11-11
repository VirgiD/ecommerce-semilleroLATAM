package com.semillero.mvppuntoorganico.repositorios;

import com.semillero.mvppuntoorganico.entidades.Foto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FotoRepositorio extends JpaRepository<Foto, String>{


}