package br.com.fiap.eventhub.model;
import jakarta.persistence.*;
import java.time.LocalDate;
@Entity
@Table(name="eventos")
public class Evento {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable=false) private String nome;
    @Column(nullable=false) private LocalDate data;
    @Column(nullable=false) private String local;
    @Column(nullable=false) private String categoria;
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getNome(){return nome;} public void setNome(String nome){this.nome=nome;}
    public LocalDate getData(){return data;} public void setData(LocalDate data){this.data=data;}
    public String getLocal(){return local;} public void setLocal(String local){this.local=local;}
    public String getCategoria(){return categoria;} public void setCategoria(String categoria){this.categoria=categoria;}
}
