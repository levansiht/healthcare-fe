import HeaderComponent from "@/components/header";
import React from "react";

export default function ProfilePage() {
    
    return (
        <div className="container mx-auto p-4 md:p-8">
            <HeaderComponent />
            <header className="my-8">
                <h1 className="text-3xl font-bold text-primary">
                    User Profile
                </h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar/Avatar Section */}
                <div className="md:col-span-1">
                    <div className="bg-card p-6 rounded-lg shadow-md text-center">
                        <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                            {/* Placeholder for Avatar Image */}
                            <span className="text-muted-foreground text-4xl">
                                JD
                            </span>
                        </div>
                        <h2 className="text-xl font-semibold text-card-foreground">
                            John Doe
                        </h2>
                        <p className="text-muted-foreground">
                            john.doe@example.com
                        </p>
                        <button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm">
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="md:col-span-2">
                    <div className="bg-card p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-card-foreground mb-4">
                            Account Details
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="block text-sm font-medium text-muted-foreground"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    defaultValue="John Doe"
                                    className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-muted-foreground"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    defaultValue="john.doe@example.com"
                                    className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="bio"
                                    className="block text-sm font-medium text-muted-foreground"
                                >
                                    Bio
                                </label>
                                <textarea
                                    id="bio"
                                    rows={3}
                                    className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    defaultValue="Fitness enthusiast and healthy eater."
                                />
                            </div>
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Additional Sections (e.g., Preferences, Activity) can be added here */}
                    <div className="mt-8 bg-card p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-card-foreground mb-4">
                            Preferences
                        </h3>
                        <p className="text-muted-foreground">
                            Notification settings, theme preferences, etc.
                        </p>
                        {/* Add preference controls here */}
                    </div>
                </div>
            </div>
        </div>
    );
}
