
package com.semillero.mvppuntoorganico.servicios;

import com.semillero.mvppuntoorganico.entidades.Foto;
import com.semillero.mvppuntoorganico.excepciones.MiException;
import com.semillero.mvppuntoorganico.repositorios.FotoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class FotoServicio {

	@Autowired
	private FotoRepositorio fotoRepositorio;

	@Transactional
	public Foto guardarFoto(MultipartFile archivo) throws MiException {
		if (archivo != null) {
			try {
				Foto foto = new Foto();
				foto.setMime(archivo.getContentType());
				foto.setNombre(archivo.getName());
				foto.setContenido(archivo.getBytes());
				return fotoRepositorio.save(foto);
			} catch (Exception e) {
				System.err.println(e.getMessage());
			}
		}
		return null;
	}

	@Transactional
	public Foto actualizarFoto(MultipartFile archivo, String idImagen) throws MiException {
		if (archivo != null) {
			try {
				Foto foto = new Foto();
				if (idImagen != null) {
					Optional<Foto> respuesta = fotoRepositorio.findById(idImagen);
					if (respuesta.isPresent()) {
						foto = respuesta.get();
					}
				}
				foto.setMime(archivo.getContentType());
				foto.setNombre(archivo.getName());
				foto.setContenido(archivo.getBytes());
				return fotoRepositorio.save(foto);
			} catch (Exception e) {
				System.err.println(e.getMessage());
			}
		}
		return null;
	}
}