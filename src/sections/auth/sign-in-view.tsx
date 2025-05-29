import { useForm } from 'react-hook-form';
import React, { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import apiCaller from '../../utils/apiCaller';
import { signInURL } from '../../utils/endpoints';
import { Iconify } from '../../components/iconify';
import { getFlashdata } from '../../utils/Flashdata';
import CustomSnackbar from '../../components/snackbar/CustomizedSnackbars';

// ----------------------------------------------------------------------
type FormValues = {
  username: string;
  password: string;
};

export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [snackProps, setSnackProps] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [flashMessageType, setFlashMessageType] = useState<'error' | 'success'>('error');

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    const message = getFlashdata();
    if (message && message != '') {
      setFlashMessageType('success');
      setSnackProps(true);
      setFlashMessage(message);
    }
  }, []);

  const onSubmit = async (data: any) => {
    setSubmitLoader(true);
    try {
      const response: any = await apiCaller<any>({
        method: 'POST',
        url: signInURL,
        data: data,
      });
      if (response.success) {
        // handleSignIn();
      }
    } catch (error: any) {
      let errorMsg = '';
      for (const [key, value] of Object.entries(error.messages)) {
        errorMsg += `${key}: ${value}\n`;
      }
      setFlashMessageType('error');
      setSubmitLoader(false);
      setFlashMessage(errorMsg || 'Error from backend services');
      setSnackProps(true);
    }
  };

  const handleSignIn = useCallback(() => {
    router.push('/');
  }, [router]);

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <TextField
        fullWidth
        {...register('username', {
          required: 'Username is required',
          minLength: {
            value: 4,
            message: 'Username must be at least 4 characters',
          },
          maxLength: {
            value: 20,
            message: 'Username must not exceed 20 characters',
          },
          pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message: 'Only letters, numbers, and underscores allowed',
          },
        })}
        label="Username"
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            message: 'Must include upper, lower, number & special character',
          },
        })}
        label="Password"
        defaultValue=""
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        loading={submitLoader}
      >
        Sign in
      </Button>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign in</Typography>
      </Box>
      {renderForm}
      <Box
        sx={{
          gap: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mt: 3,
          }}
        >
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }} href="/register">
            Get started
          </Link>
        </Typography>
        <CustomSnackbar
          open={snackProps}
          setOpen={setSnackProps}
          severity={flashMessageType}
          message={flashMessage}
        />
      </Box>
    </>
  );
}
