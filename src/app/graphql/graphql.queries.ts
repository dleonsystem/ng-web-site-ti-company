import { gql } from 'apollo-angular';

// Query for Testimonials
const GET_ALL_TESTIMONIALS = gql`
  query GetAllTestimonials {
    testimonials {
      nombre
      estrellas
      proyecto
      avatar
      comentario
    }
  }
`;

// Query for Portfolio
const GET_ALL_PORTFOLIO = gql`
  query GetAllPortfolio($language: String!) {
    portfolio(language: $language) {
      titulo
      descripcion
      sector
      enlaceDemo
      imagen
    }
  }
`;

// Query for Services
const GET_ALL_SERVICES = gql`
  query GetAllServices($language: String!) {
    services(language: $language) {
      categorias {
        nombre
        eventoGA
        icono
        id
        imagen
        link
        precioBase
        servicios {
          nombre
          paquetes {
            tipo
            precio
            caracteristicas
            duracion
            precioMXN
          }
        }
      }
      bundles {
        nombre
        precio
        incluye
        descripcion
        duracion
        eventoGA
        id
        plataformas
        precioMXN
      }
    }
  }
`;

// Query for Blog Posts
const GET_BLOG = gql`
  query GetBlog($language: String!) {
    blog(language: $language) {
      id
      title
      excerpt
      content
      image
      alt
    }
  }
`;

// Query for Success Cases
const GET_ALL_SUCCESS_CASES = gql`
  query GetAllSuccessCases {
    successCases {
      id
      nombre
      cliente
      clave
      integraciones
      periodo
      resultados
      rol
      sector
      stack
      usuariosImpactados
    }
  }
`;

export {
  GET_ALL_TESTIMONIALS,
  GET_ALL_PORTFOLIO,
  GET_ALL_SERVICES,
  GET_BLOG,
  GET_ALL_SUCCESS_CASES,
};