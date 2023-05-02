package com.imagen.crud.controladores;

import org.springframework.http.HttpStatus;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.imagen.crud.entidades.Image;
import com.imagen.crud.repositorios.ImageRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
/**
 *
 * @author Raúl Gómez
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/images")
public class ImageController {

  @Autowired
  private ImageRepository imageRepository;

  @PostMapping("/upload")
  public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
    try {
      // Guardar la imagen en el sistema de archivos
      byte[] bytes = file.getBytes();
        Path path = Paths.get("uploads/" + file.getOriginalFilename());
      Files.write(path, bytes);

      // Guardar la información de la imagen en la base de datos
      Image image = new Image();
      image.setName(file.getOriginalFilename());
      image.setPath(path.toString());
      imageRepository.save(image);

      return ResponseEntity.ok().header("Access-Control-Allow-Origin", "*").body("Imagen cargada con éxito");
//return ResponseEntity.ok().body("Imagen cargada con éxito");
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al cargar la imagen");
    }
  }

  @GetMapping("/all")
  public List<Image> getAllImages() {
    return imageRepository.findAll();
  }

}
