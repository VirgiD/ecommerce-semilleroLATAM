package com.semillero.mvppuntoorganico.controladores;

import com.semillero.mvppuntoorganico.entidades.Producto;
import com.semillero.mvppuntoorganico.servicios.ProductoServicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/foto")
public class FotoControlador {

	@Autowired
	private ProductoServicio productoServicio;

	@GetMapping("/producto/{id}")
	public ResponseEntity<byte[]> imagenDev(@PathVariable String id) {
		Producto producto = productoServicio.getOne(id);

		byte[] imagen = producto.getFoto().getContenido();

		HttpHeaders headers = new HttpHeaders();

		headers.setContentType(MediaType.IMAGE_JPEG);

		return new ResponseEntity<>(imagen, headers, HttpStatus.OK);

	}
}
