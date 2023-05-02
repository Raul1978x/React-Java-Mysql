package com.imagen.crud.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.imagen.crud.entidades.Image;


/**
 *
 * @author Raúl Gómez
 */


@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

}
