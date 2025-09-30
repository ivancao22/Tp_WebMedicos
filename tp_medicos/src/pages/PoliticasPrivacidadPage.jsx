import { Box, Paper, Typography } from "@mui/material";

// Página de políticas de privacidad, con diseño limpio y responsivo.
// Explica cómo se manejan los datos de los usuarios en el sitio.
export default function PoliticasPrivacidad() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "#eff6ff",
        py: 6,
      }}
    >
      {/* Card blanca principal */}
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
        {/* Título grande centrado */}
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 3, color: "#2563eb", fontWeight: 700 }}
        >
          Políticas de Privacidad
        </Typography>
        {/* Contenido principal, scroll si hay mucho texto */}
        <Box
          sx={{
            maxHeight: "65vh",
            overflowY: "auto",
            px: 1,
          }}
        >
          {/* Explicación y puntos principales */}
          <Typography variant="body1" sx={{ mb: 2, color: "#222" }}>
            En nuestro sitio web, la privacidad de nuestros usuarios es una prioridad. A continuación, se detallan nuestras políticas de privacidad:
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
            1. Recopilación de datos
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Recopilamos información personal únicamente cuando es necesaria para brindarle nuestros servicios. Los datos requeridos pueden incluir nombre, correo electrónico, teléfono y obra social.
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
            2. Uso de la información
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Utilizamos sus datos personales exclusivamente para gestionar sus citas médicas, mejorar nuestros servicios y comunicarnos con usted cuando sea necesario.
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
            3. Protección de datos
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Implementamos medidas de seguridad adecuadas para proteger su información contra accesos no autorizados, alteraciones o destrucción.
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
            4. Compartir información
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            No compartimos sus datos personales con terceros, salvo que sea requerido por ley o para la prestación de nuestros servicios.
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
            5. Derechos del usuario
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Usted puede solicitar la actualización, corrección o eliminación de sus datos personales en cualquier momento, contactándonos a través de los medios disponibles en el sitio.
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
            6. Cambios en la política
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Nos reservamos el derecho de modificar estas políticas. Las actualizaciones serán publicadas en esta página.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}