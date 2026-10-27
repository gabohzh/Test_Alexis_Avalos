package com.example.demo.service;

import com.example.demo.dto.ClientDTO;
import java.util.List;

public interface ClientService {

    List<ClientDTO> findAll();

    ClientDTO findById(Long id);

    ClientDTO create(ClientDTO dto);

    ClientDTO update(Long id, ClientDTO dto);

    void delete(Long id);
    
}
