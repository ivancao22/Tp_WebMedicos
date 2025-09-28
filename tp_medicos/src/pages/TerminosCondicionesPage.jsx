import { Box, Paper, Typography } from "@mui/material";

// Página de Términos y Condiciones.
// Muestra las reglas para usar el sitio y cómo se maneja la privacidad, cambios, propiedad y contacto.
export default function TerminosCondiciones() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "#f7fbff",
        py: 6,
      }}
    >
      {/* Card blanca central para el contenido */}
      <Paper
        elevation={8}
        sx={{
          width: { xs: "96vw", md: 900 },
          maxWidth: "98vw",
          p: { xs: 2, md: 5 },
          borderRadius: 4,
          boxShadow: "0 8px 32px #0002",
        }}
      >
        {/* Título en azul, centrado y grande */}
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 3, color: "#2563eb", fontWeight: 700 }}
        >
          Términos y Condiciones
        </Typography>
        {/* Contenido principal con scroll si es largo */}
        <Box
          sx={{
            maxHeight: "65vh",
            overflowY: "auto",
            px: 1,
          }}
        >
          {/* Breve introducción al texto */}
          <Typography variant="body1" sx={{ mb: 2, color: "#222" }}>
            Bienvenido a nuestro sitio web. Al utilizar nuestros servicios, usted acepta los siguientes términos y condiciones:
          </Typography>
          {/* Puntos principales de los términos */}
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
            1. Uso del sitio
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Usted se compromete a utilizar el sitio de manera responsable y conforme a la ley. No está permitido utilizar el sitio para actividades ilícitas o que incumplan estos términos.
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
            2. Privacidad
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Respetamos su privacidad y protegemos sus datos personales conforme a nuestra Política de Privacidad.
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
            3. Modificaciones
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Nos reservamos el derecho a modificar estos términos en cualquier momento. Le recomendamos revisarlos periódicamente.
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
            4. Propiedad intelectual
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Todos los contenidos, logotipos y marcas son propiedad de sus respectivos titulares. Está prohibida la reproducción parcial o total sin autorización.
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
            5. Contacto
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Para cualquier duda o consulta, puede contactarnos a través del formulario de contacto disponible en el sitio.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}