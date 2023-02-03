import { useTheme, Typography } from "@mui/material";

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      NOT<span style={{ color: theme.palette.primary.main }}>FLIX</span>
    </Typography>
  );
};

export default Logo;
