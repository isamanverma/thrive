import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Edit,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile information and health data
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Picture & Basic Info */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-lg font-medium text-gray-900">John Doe</h3>
            <p className="text-sm text-gray-500">Member since January 2024</p>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Personal Information</CardTitle>
              <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-sm text-gray-900">john.doe@example.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">Phone</p>
                <p className="text-sm text-gray-900">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">Location</p>
                <p className="text-sm text-gray-900">New York, NY</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Date of Birth
                </p>
                <p className="text-sm text-gray-900">January 15, 1990</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Health Information */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Health Information</CardTitle>
              <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Age</p>
                <p className="text-lg font-semibold text-gray-900">34 years</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Gender</p>
                <p className="text-lg font-semibold text-gray-900">Male</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Height</p>
                <p className="text-lg font-semibold text-gray-900">175 cm</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Weight</p>
                <p className="text-lg font-semibold text-gray-900">68.5 kg</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">BMI</p>
              <p className="text-lg font-semibold text-green-600">
                22.4 (Normal)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Fitness Goals */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Fitness Goals</CardTitle>
              <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Primary Goal</p>
              <p className="text-lg font-semibold text-gray-900">Lose Weight</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">Target Weight</p>
              <p className="text-lg font-semibold text-gray-900">66 kg</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">
                Activity Level
              </p>
              <p className="text-lg font-semibold text-gray-900">
                Moderately Active
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">Diet Type</p>
              <p className="text-lg font-semibold text-gray-900">Balanced</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dietary Preferences */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Dietary Preferences</CardTitle>
            <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Allergies</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                  Nuts
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                  Shellfish
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Dislikes</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                  Spicy Food
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                  Mushrooms
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Preferences</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Vegetarian
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Low Sodium
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  High Protein
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Cuisines</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Mediterranean
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Asian
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Italian
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Update Profile
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Change Password
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Export Data
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
