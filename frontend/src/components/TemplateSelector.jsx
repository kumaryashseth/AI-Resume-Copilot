import React from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Typography,
} from "@mui/material";

const TemplateSelector = ({
  template,
  setTemplate,
}) => {
  return (
    <Paper
      elevation={3}
      className="p-5 mb-5"
    >
      <Typography
        variant="h6"
        gutterBottom
      >
        Resume Template
      </Typography>

      <FormControl fullWidth>

        <InputLabel>
          Template
        </InputLabel>

        <Select
          value={template}
          label="Template"
          onChange={(e) =>
            setTemplate(e.target.value)
          }
        >
          <MenuItem value="modern">
            Modern
          </MenuItem>

          <MenuItem value="professional">
            Professional
          </MenuItem>

          <MenuItem value="ats">
            ATS Classic
          </MenuItem>

          <MenuItem value="developer">
            Developer
          </MenuItem>

          <MenuItem value="minimal">
            Minimal
          </MenuItem>

        </Select>

      </FormControl>

    </Paper>
  );
};

export default TemplateSelector;