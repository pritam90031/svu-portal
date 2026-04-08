import React from "react";
import { Box, Typography, Grid, Card, Avatar, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import Navbar from "../components/Navbar";

const faculty = [
  { name: "Dr. A. Sharma", role: "Head of Computer Science", initials: "AS" },
  { name: "Prof. R. Verma", role: "Dean of Engineering", initials: "RV" },
  { name: "Dr. P. Singh", role: "Head of Management Studies", initials: "PS" },
  { name: "Prof. K. Das", role: "Director of Research", initials: "KD" },
];

function AboutPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Navbar />

      <Box sx={{ px: { xs: 2, md: 4 }, py: 4, maxWidth: 1280, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <img src="/logo.png" alt="SVU" style={{ height: 100 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, mt: 2, color: "#1a1a1a" }}>
            Swami Vivekananda University
          </Typography>
          <Typography sx={{ color: "#666", mt: 1, maxWidth: 600, mx: "auto" }}>
            A modern private university established in 2019, focused on academic excellence, innovation, and multidisciplinary learning.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Mission & Vision */}
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e8e8e8", height: "100%" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e5c3a", mb: 2 }}>
                Our Mission
              </Typography>
              <Typography sx={{ color: "#555", lineHeight: 1.8 }}>
                To provide quality higher education that empowers students with knowledge, skills, and values to contribute meaningfully to society. We strive to create an environment that fosters critical thinking, creativity, and lifelong learning.
              </Typography>
              <Divider sx={{ my: 2.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e5c3a", mb: 2 }}>
                Our Vision
              </Typography>
              <Typography sx={{ color: "#555", lineHeight: 1.8 }}>
                To be a globally recognized institution of higher learning that produces graduates who are leaders in their respective fields, contributing to the advancement of knowledge and the betterment of humankind.
              </Typography>
            </Card>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e8e8e8", height: "100%" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e5c3a", mb: 2.5 }}>
                Contact Information
              </Typography>
              {[
                { icon: <LocationOnIcon />, text: "Barasat, Kolkata - 700126, West Bengal, India" },
                { icon: <PhoneIcon />, text: "+91 33 2564 7890" },
                { icon: <EmailIcon />, text: "info@svu.edu.in" },
                { icon: <LanguageIcon />, text: "www.svu.edu.in" },
              ].map((item) => (
                <Box key={item.text} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2 }}>
                  <Box sx={{ color: "#1e5c3a", mt: 0.3 }}>{item.icon}</Box>
                  <Typography sx={{ color: "#555", fontSize: "0.9rem" }}>{item.text}</Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2.5 }} />

              {/* Quick Stats */}
              <Grid container spacing={1.5}>
                {[
                  { label: "Established", value: "2019" },
                  { label: "Programmes", value: "25+" },
                  { label: "Students", value: "5,000+" },
                  { label: "Faculty", value: "200+" },
                ].map((stat) => (
                  <Grid item xs={6} key={stat.label}>
                    <Box sx={{ bgcolor: "#f0f7f3", p: 1.5, borderRadius: 2, textAlign: "center" }}>
                      <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", color: "#1e5c3a" }}>
                        {stat.value}
                      </Typography>
                      <Typography sx={{ fontSize: "0.78rem", color: "#888" }}>{stat.label}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>

          {/* Faculty */}
          <Grid item xs={12}>
            <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e8e8e8" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e5c3a", mb: 2.5 }}>
                Key Faculty Members
              </Typography>
              <Grid container spacing={2}>
                {faculty.map((f) => (
                  <Grid item xs={6} sm={3} key={f.name}>
                    <Box sx={{ textAlign: "center", p: 2 }}>
                      <Avatar
                        sx={{
                          width: 64,
                          height: 64,
                          bgcolor: "#1e5c3a",
                          fontSize: "1.2rem",
                          mx: "auto",
                          mb: 1.5,
                        }}
                      >
                        {f.initials}
                      </Avatar>
                      <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#1a1a1a" }}>
                        {f.name}
                      </Typography>
                      <Typography sx={{ fontSize: "0.78rem", color: "#888", mt: 0.3 }}>
                        {f.role}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AboutPage;