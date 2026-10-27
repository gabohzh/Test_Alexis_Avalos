package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.ClientDTO;
import com.example.demo.entity.Client;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.ClientRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ClientServiceImpl implements ClientService {

    private final ClientRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<ClientDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public ClientDTO findById(Long id) {
        Client client = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cliente no encontrado con id: " + id));
        return toDTO(client);
    }

    @Override
    public ClientDTO create(ClientDTO dto) {
        Client client = toEntity(dto);
        return toDTO(repository.save(client));
    }

    @Override
    public ClientDTO update(Long id, ClientDTO dto) {
        Client existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cliente no encontrado con id: " + id));
        existing.setNombre(dto.getNombre());
        existing.setEmail(dto.getEmail());
        existing.setTelefono(dto.getTelefono());
        existing.setActivo(dto.getActivo());
        existing.setFecharegistro(dto.getFecharegistro());
        return toDTO(repository.save(existing));
    }

    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Cliente no encontrado con id: " + id);
        }
        repository.deleteById(id);
    }

    // ── Mappers privados ──────────────────────────────────────────────────────

    private ClientDTO toDTO(Client c) {
        return ClientDTO.builder()
                .id(c.getId())
                .nombre(c.getNombre())
                .email(c.getEmail())
                .telefono(c.getTelefono())
                .activo(c.getActivo())
                .fecharegistro(c.getFecharegistro())
                .build();
    }

    private Client toEntity(ClientDTO dto) {
        return Client.builder()
                .nombre(dto.getNombre())
                .email(dto.getEmail())
                .telefono(dto.getTelefono())
                .activo(dto.getActivo())
                .fecharegistro(dto.getFecharegistro())
                .build();
    }

}
