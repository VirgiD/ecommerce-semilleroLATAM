package com.semillero.mvppuntoorganico.servicios;

import com.semillero.mvppuntoorganico.entidades.Foto;
import com.semillero.mvppuntoorganico.entidades.Producto;
import com.semillero.mvppuntoorganico.excepciones.MiException;
import com.semillero.mvppuntoorganico.repositorios.ProductoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoServicio {

	@Autowired
	private ProductoRepositorio productoRepositorio;

	@Autowired
	private FotoServicio fotoServicio;

	@Transactional
	public void crearProducto(MultipartFile foto, String nombre, String descripcion, Double precio, int peso)
			throws MiException, IOException {

		validar(nombre, descripcion, precio);

		Producto producto = new Producto();

		producto.setNombre(nombre);
		producto.setDescripcion(descripcion);
		producto.setPrecio(precio);
		producto.setPeso(peso);
		Foto fotoprod = fotoServicio.guardarFoto(foto);
		producto.setFoto(fotoprod);

		productoRepositorio.save(producto);
	}

	public List<Producto> listarProductos() {
		return productoRepositorio.findByEliminadoFalse();
	}

	public Producto getOne(String id) {
		return productoRepositorio.getOne(id);
	}

	@Transactional
	public void modificarProducto(String id, String nombre, String descripcion, Double precio, int peso,
			MultipartFile archivo) throws MiException {
		validar(nombre, descripcion, precio);

		Optional<Producto> respuesta = productoRepositorio.findById(id);

		if (respuesta.isPresent()) {
			Producto producto = respuesta.get();

			producto.setNombre(nombre);
			producto.setDescripcion(descripcion);
			producto.setPrecio(precio);
			producto.setPeso(peso);
			if (archivo != null && !archivo.isEmpty()) {
				String idImagen = null;
				if (producto.getFoto() != null) {
					idImagen = producto.getFoto().getId();
				}
				Foto foto = fotoServicio.actualizarFoto(archivo, idImagen);
				producto.setFoto(foto);
			}

			productoRepositorio.save(producto);
		}
	}

	@Transactional
	public void eliminarProducto(String id) {
		System.out.println(id);
		Producto producto = productoRepositorio.findById(id).orElse(null);
		if (producto != null) {
			producto.setEliminado(true);
			productoRepositorio.save(producto);
		}
	}

	private void validar(String nombre, String descripcion, Double precio) throws MiException {
		if (nombre.isEmpty() || nombre == null) {
			throw new MiException("El nombre no puede estar vacio");
		}

		if (descripcion.isEmpty() || descripcion == null) {
			throw new MiException("Ingrese una descripcion");
		}

		if (precio <= 0) {
			throw new MiException("El precio no puede ser cero o menor que cero");
		}

	}

	public List<Producto> ListAll(String palabraClave) {
		if (palabraClave != null) {
			return productoRepositorio.findAllByParams(palabraClave);
		}
		return productoRepositorio.findAll();
	}

}
