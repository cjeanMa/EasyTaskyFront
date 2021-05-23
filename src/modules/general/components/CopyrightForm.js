import { Link, Typography } from '@material-ui/core';
import React from 'react'

const CopyrightForm = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="/">
            Easy Tasky
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
}

export default CopyrightForm
