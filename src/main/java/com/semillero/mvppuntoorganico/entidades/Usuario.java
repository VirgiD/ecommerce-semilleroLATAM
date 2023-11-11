package com.semillero.mvppuntoorganico.entidades;

import javax.persistence.*;
import com.semillero.mvppuntoorganico.enumeraciones.Rol;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name ="usuario")
public class Usuario {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Column(name = "nombre")
    private String nombre;

   @Column(name = "email")
    private String email;

    @Column(name = "contrasena")
    private String contrasena;

    @Enumerated(EnumType.STRING)
    @Column(name = "Roles")
    private Rol rol;
    
    @Column(name = "eliminado")
    private Boolean eliminado = false;




}



