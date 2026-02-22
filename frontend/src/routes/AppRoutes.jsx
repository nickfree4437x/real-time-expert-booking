import { Routes, Route } from "react-router-dom";
import ExpertsList from "../pages/ExpertsList";
import ExpertDetail from "../pages/ExpertDetail";
import BookingForm from "../pages/BookingForm";
import MyBookings from "../pages/MyBookings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ExpertsList />} />
      <Route path="/experts/:id" element={<ExpertDetail />} />
      <Route path="/book/:expertId" element={<BookingForm />} />
      <Route path="/my-bookings" element={<MyBookings />} />
    </Routes>
  );
};

export default AppRoutes;