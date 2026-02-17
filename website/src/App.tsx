import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/DashboardLayout'

// Public pages
import HomePage from './pages/HomePage'
import PricingPage from './pages/PricingPage'
import DocsPage from './pages/DocsPage'
import AuthCallback from './pages/AuthCallback'

// Dashboard pages
import DashboardOverview from './pages/dashboard/Overview'
import DashboardEpoxy from './pages/dashboard/Epoxy'
import DashboardLicense from './pages/dashboard/License'
import DashboardDownloads from './pages/dashboard/Downloads'
import DashboardSettings from './pages/dashboard/Settings'

// Other pages (if they exist)
import BlogPage from './pages/BlogPage'
import GuidesPage from './pages/GuidesPage'
import ExamplesPage from './pages/ExamplesPage'
import CommunityPage from './pages/CommunityPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ChangelogPage from './pages/ChangelogPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import NotFoundPage from './pages/NotFoundPage'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Auth callback (no layout) */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Dashboard routes (protected, with dashboard layout) */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardOverview />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/epoxy" element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardEpoxy />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/license" element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardLicense />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/downloads" element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardDownloads />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/settings" element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardSettings />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Public routes (with navbar and footer) */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <HomePage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/pricing" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <PricingPage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/docs" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <DocsPage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/blog" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <BlogPage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/guides" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <GuidesPage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/examples" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <ExamplesPage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/community" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <CommunityPage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/about" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <AboutPage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/contact" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <ContactPage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/changelog" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <ChangelogPage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/privacy" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <PrivacyPage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/terms" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <TermsPage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="*" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <NotFoundPage />
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App
