// Lucide icons selectable from TinaCMS `icon` string fields.
import {
  Anchor,
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Star,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  Anchor,
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Star,
  Users,
  Wrench,
};

export const getIcon = (name?: string): LucideIcon => (name && ICONS[name]) || Wrench;
