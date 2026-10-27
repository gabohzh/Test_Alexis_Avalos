package com.example.demo.dto;

import java.math.BigDecimal;
import java.util.Date;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientDTO {
    private Long id;

    @NotBlank(message = "El nombre es requerido")
    private String nombre;
    
    @NotBlank(message = "El email es requerido")
    private String email;
    
    @NotBlank(message = "El telefono es requerido")
    private String telefono;
    
    private Boolean activo;
    
    private Date fecharegistro;


}
