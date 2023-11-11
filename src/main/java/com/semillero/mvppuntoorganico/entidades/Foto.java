package com.semillero.mvppuntoorganico.entidades;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;


@Data
@Entity
@Table(name = "foto")
@Getter
@Setter
public class Foto{
	
	@Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String mime; 

    private String nombre; 
    @Lob
    @Basic(fetch = FetchType.LAZY) 
    private byte[] contenido; 
}
