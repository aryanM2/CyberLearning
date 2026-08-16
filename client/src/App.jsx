import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { UserLayout } from './layouts/UserLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';

// User Pages
import { DashboardPage } from './pages/user/DashboardPage';
import { ArticlesPage } from './pages/user/ArticlesPage';
import { ArticleDetailPage } from './pages/user/ArticleDetailPage';
import { ChallengesPage } from './pages/user/ChallengesPage';
import { ChallengeDetailPage } from './pages/user/ChallengeDetailPage';
import { AchievementsPage } from './pages/user/AchievementsPage';
import { LeaderboardPage } from './pages/user/LeaderboardPage';
import { RewardsPage } from './pages/user/RewardsPage';
import { ProfilePage } from './pages/user/ProfilePage';
import { ActivityPage } from './pages/user/ActivityPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminArticlesPage } from './pages/admin/AdminArticlesPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminChallengesPage } from './pages/admin/AdminChallengesPage';
import { AdminAchievementsPage } from './pages/admin/AdminAchievementsPage';
import { AdminRewardsPage } from './pages/admin/AdminRewardsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export function App() {
  return (
    <Router>
      <Routes>
        
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* User Application Routes */}
        <Route path="/app" element={<UserLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:id" element={<ArticleDetailPage />} />
          <Route path="challenges" element={<ChallengesPage />} />
          <Route path="challenges/:id" element={<ChallengeDetailPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="rewards" element={<RewardsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="activity" element={<ActivityPage />} />
        </Route>

        {/* Admin Application Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="articles" element={<AdminArticlesPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="challenges" element={<AdminChallengesPage />} />
          <Route path="achievements" element={<AdminAchievementsPage />} />
          <Route path="rewards" element={<AdminRewardsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
