import { useState, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import CustomizedSnackbars from 'src/components/snackbar/CustomizedSnackbars';

import apiCaller from '../../utils/apiCaller';
import { registerURL } from '../../utils/endpoints';
import { setFlashdata } from '../../utils/Flashdata';

type FormValues = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  roles: string;
  department: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export function RegisterView() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [snackProps, setSnackProps] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const password = watch('password');

  const onSubmit = async (data: any) => {
    setSubmitLoader(true);
    try {
      const response: any = await apiCaller<any>({
        method: 'POST',
        url: registerURL,
        data: data,
      });
      if (response.success) {
        setFlashdata(
          'Registeration completed. You can login once you account is activated by Admin'
        );
        handleSignIn();
      }
    } catch (error: any) {
      let errorMsg = '';
      for (const [key, value] of Object.entries(error.messages)) {
        errorMsg += `${key}: ${value}\n`;
      }
      setSubmitLoader(false);
      setFlashMessage(errorMsg || 'Error from backend services');
      setSnackProps(true);
    }
  };

  const handleSignIn = useCallback(() => {
    router.push('/sign-in');
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
      <Controller
        name="title"
        control={control}
        rules={{ required: 'Title is required' }}
        render={({ field }) => (
          <FormControl fullWidth sx={{ mb: 3 }} error={!!errors.title}>
            <InputLabel id="age-label" shrink>
              Title
            </InputLabel>
            <Select
              labelId="age-label"
              label="Title"
              displayEmpty
              {...field}
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
            >
              <MenuItem value="Dr.">Dr.</MenuItem>
              <MenuItem value="Mr.">Mr.</MenuItem>
              <MenuItem value="Mrs.">Mrs.</MenuItem>
              <MenuItem value="Ms.">Ms.</MenuItem>
            </Select>
            <FormHelperText>{errors?.title ? errors.title.message : ''}</FormHelperText>
          </FormControl>
        )}
      />

      <TextField
        fullWidth
        {...register('firstName', { required: 'First Name is required' })}
        label="First Name"
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />

      <TextField
        fullWidth
        {...register('lastName', { required: 'Last Name is required' })}
        label="Last Name"
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />

      <TextField
        fullWidth
        label="Email Address"
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email address',
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        fullWidth
        {...register('mobileNumber', {
          required: 'Mobile number is required',
          pattern: {
            value: /^[6-9]\d{9}$/,
            message: 'Enter a valid 10-digit mobile number',
          },
        })}
        label="Mobile Number"
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
        error={!!errors.mobileNumber}
        helperText={errors.mobileNumber?.message}
      />

      <Controller
        name="roles"
        control={control}
        rules={{ required: 'Role is required' }}
        render={({ field }) => (
          <FormControl fullWidth sx={{ mb: 3 }} error={!!errors.roles}>
            <InputLabel id="role-label" shrink>
              Role
            </InputLabel>
            <Select
              labelId="role-label"
              label="Role"
              displayEmpty
              {...field}
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
            >
              <MenuItem value="FRONTDESK">Frontdesk</MenuItem>
              <MenuItem value="DOCTOR">Doctor</MenuItem>
            </Select>
            <FormHelperText>{errors?.roles?.message}</FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name="department"
        control={control}
        rules={{ required: 'Department is required' }}
        render={({ field }) => (
          <FormControl fullWidth sx={{ mb: 3 }} error={!!errors.department}>
            <InputLabel id="department-label" shrink>
              Department
            </InputLabel>
            <Select
              labelId="department-label"
              label="Department"
              displayEmpty
              {...field}
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
            >
              <MenuItem value="OPTHALMOLOGY">Opthalmology</MenuItem>
              <MenuItem value="RADIOLOGY">Radiology</MenuItem>
            </Select>
            <FormHelperText>{errors?.department?.message}</FormHelperText>
          </FormControl>
        )}
      />

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

      <TextField
        fullWidth
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) => value === password || 'Passwords do not match',
        })}
        label="Confirm Password"
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
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        loading={submitLoader}
      >
        Register
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
        <Typography variant="h5">Register</Typography>
      </Box>
      {renderForm}
      <CustomizedSnackbars
        open={snackProps}
        setOpen={setSnackProps}
        severity="error"
        message={flashMessage}
      />
    </>
  );
}
