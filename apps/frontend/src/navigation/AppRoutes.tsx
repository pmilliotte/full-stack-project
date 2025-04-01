import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { Layout } from '~/components/layout/Layout';
import { ProtectedRoute } from '~/components/ProtectedRoute';
import { ForgotPassword } from '~/pages/ForgotPassword';
import { Home } from '~/pages/Home';
import { Login } from '~/pages/Login';
import { Mutation } from '~/pages/Mutation';
import { Query } from '~/pages/Query';
import { Signup } from '~/pages/Signup';

export const AppRoutes = (): ReactElement => (
  <BrowserRouter>
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<Signup />} path="/signup" />
      <Route element={<ForgotPassword />} path="/forgot-password" />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route element={<Home />} path="/" />
          <Route element={<Mutation />} path="/mutation" />
          <Route element={<Query />} path="/query" />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
