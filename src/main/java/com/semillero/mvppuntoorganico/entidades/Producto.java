package com.semillero.mvppuntoorganico.entidades;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.text.DecimalFormat;

@Entity
@Table(name = "producto")
@Data
@Getter
@Setter
public class Producto {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "Descripcion")
    private String descripcion;

    @Column(name = "Precio")

    private Double precio;

    @Column(name = "Peso")
    private int peso;


    @Column(name = "Eliminado")
    private Boolean eliminado = false;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "foto_id", referencedColumnName = "id")
    private Foto foto;

    public String getPrecioFormatted() {
        if (precio != null) {
            DecimalFormat decimalFormat = new DecimalFormat("#,###,###.00");
            return decimalFormat.format(precio);
        } else {
            return "";
        }
    }

}

