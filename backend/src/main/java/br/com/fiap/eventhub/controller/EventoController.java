package br.com.fiap.eventhub.controller;
import br.com.fiap.eventhub.model.Evento;
import br.com.fiap.eventhub.repository.EventoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/eventos")
public class EventoController {
    private final EventoRepository repository;
    public EventoController(EventoRepository repository){this.repository=repository;}
    @GetMapping public List<Evento> listar(){return repository.findAll();}
    @PostMapping public Evento criar(@RequestBody Evento evento){evento.setId(null); return repository.save(evento);}
    @DeleteMapping("/{id}") public ResponseEntity<Void> excluir(@PathVariable Long id){
        if(!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id); return ResponseEntity.noContent().build();
    }
    @GetMapping("/health") public String health(){return "OK";}
}
