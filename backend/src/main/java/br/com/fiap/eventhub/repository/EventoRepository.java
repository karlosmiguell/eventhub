package br.com.fiap.eventhub.repository;
import br.com.fiap.eventhub.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
public interface EventoRepository extends JpaRepository<Evento, Long> {}
