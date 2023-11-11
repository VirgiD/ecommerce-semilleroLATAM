package com.semillero.mvppuntoorganico.controladores;

import com.semillero.mvppuntoorganico.entidades.Producto;
import com.semillero.mvppuntoorganico.excepciones.MiException;
import com.semillero.mvppuntoorganico.repositorios.ProductoRepositorio;
import com.semillero.mvppuntoorganico.servicios.ProductoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/productos")
public class ProductoControlador {

	@Autowired
	private ProductoServicio productoServicio;

	@Autowired
	private ProductoRepositorio productoRepositorio;

	@GetMapping("/finalizarCompra")
	public String mostrarVistaFinalizarCompra() {
		return "finalizarCompra";
	}

	@GetMapping("/editar")
	public String verProductosAdmin(ModelMap model, @Param("palabraClave") String palabraClave) {

		List<Producto> producto = new ArrayList<>();
		if (palabraClave != null && !palabraClave.isEmpty()) {
			model.addAttribute("palabraClave", palabraClave);
			producto = productoServicio.ListAll(palabraClave);

		} else {
			producto = productoServicio.listarProductos();
		}
		model.addAttribute("productos", producto);
		return "productos_editar";
	}

	@GetMapping("/listar")
	public String verProductosUsuario(ModelMap model, @Param("palabraClave") String palabraClave) {

		List<Producto> producto = new ArrayList<>();
		if (palabraClave != null && !palabraClave.isEmpty()) {
			model.addAttribute("palabraClave", palabraClave);
			producto = productoServicio.ListAll(palabraClave);

		} else {
			producto = productoServicio.listarProductos();
		}
		model.addAttribute("productos", producto);
		return "productos_clientes";
	}

	@GetMapping("/cargar") // localhost:8080/productos/cargar
	public String cargarProducto() {

		return "producto_form";
	}

	@PostMapping("/cargarproducto")
	public String cargarProducto(@RequestParam String nombre, @RequestParam int peso, @RequestParam Double precio,
			@RequestParam MultipartFile foto, @RequestParam String descripcion) throws IOException {
		try {
			productoServicio.crearProducto(foto, nombre, descripcion, precio, peso);
		} catch (MiException e) {
			return "productos_editar";

		}

		return "redirect:/productos/editar";
	}

	@GetMapping("/modificar/{id}")
	public String modificarProducto(@PathVariable String id, ModelMap model) {

		model.put("producto", productoServicio.getOne(id));

		return "modificar_producto";
	}

	@PostMapping("/modificar/{id}")
	public String modificarProducto(@PathVariable String id, String nombre, String descripcion, Double precio, int peso,
			ModelMap modelo, MultipartFile foto) throws MiException {
		try {
			productoServicio.modificarProducto(id, nombre, descripcion, precio, peso, foto);
			return "redirect:/productos/listar";
		} catch (MiException e) {
			modelo.put("error", e.getMessage());
			return "modificar_producto";
		}
	}

	@GetMapping("/eliminar/{id}")
	public String eliminar(@PathVariable String id, ModelMap modelo) {
		productoServicio.eliminarProducto(id);
		return "redirect:/productos/listar";
	}

}