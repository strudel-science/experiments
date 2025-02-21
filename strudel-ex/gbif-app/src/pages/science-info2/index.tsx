import { Box, Button, Container, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { LabelValueTable } from '../../components/LabelValueTable';
import { taskflow } from './_config/taskflow.config';

/**
 * Initial page for registering as a contributor in the contribute-data Task Flow.
 * After submitting, users are directed to the `<ContributorPortal>`.
 */
const Register: React.FC = () => {
  return (
    <Container
        maxWidth="md"
        sx={{
          mt: 4
        }}
      >
        <Paper
          sx={{
            padding: 2
          }}
        >
          <Stack spacing={4}>
            <Typography 
              variant="h6" 
              component="h1" 
            >
              {taskflow.pages.index.title}
            </Typography>
            <Box>
              <LabelValueTable
                rows={[
                  {
                    label: 'Step 1',
                    value: 'Please enter the following information to register as a data contributor '
                  },
                  {
                    label: 'Step 2',
                    value: 'Once registerted click "SUBMIT REGISTRATION" to continue '
                  },
                  {
                    label: 'Step 3',
                    value: 'You will be led to a page where you can view and upload datasets '
                  }
                ]}
              />
            </Box>
            <Box> 
              <Typography fontWeight="medium" mb={1}>
                Description
              </Typography>
              {/* TODO: Make it easier to render text as multiple paragraphs (maybe support markdown in certain components) */}
              <Stack>
                <Typography>
                  Explain data contribution process in brief, with links to proper documentation of steps, requirements and guidelines if any. Link to documentation
                </Typography>
              </Stack>
            </Box>
            <Box>
              <Typography fontWeight="medium" mb={2}>
                Registration Form
              </Typography>
              <Stack>
                <TextField id="email" label="Email" variant="outlined" fullWidth />
                <TextField id="first-name" label="First Name" variant="outlined" fullWidth />
                <TextField id="last-name" label="Last Name" variant="outlined" fullWidth />
                <TextField id="organization" label="Organization" variant="outlined" fullWidth />
                <TextField id="project-title" label="Project Title" variant="outlined" fullWidth />
                <TextField id="project-brief" label="Project Brief" variant="outlined" fullWidth multiline minRows={4} />
              </Stack>
            </Box>
            <Box>
              <Link component={RouterLink} to="portal">
                <Button variant="contained">
                  Submit Registration
                </Button>
              </Link>
            </Box>
          </Stack>
        </Paper>
      </Container>
  )
}

export default Register;