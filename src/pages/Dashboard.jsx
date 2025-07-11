import { useUser, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Section from '../components/Section';

const Dashboard = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalReplies: 1247,
    activeKeywords: 8,
    responseRate: 94,
    savedTime: 12.5
  });

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/login');
    }
  }, [isSignedIn, isLoaded, navigate]);

  if (!isLoaded) {
    return (
      <Section className="pt-[12rem]">
        <div className="container text-center">
          <div className="animate-spin w-8 h-8 border-2 border-color-1 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-n-4">Loading...</p>
        </div>
      </Section>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-n-8">
      {/* Dashboard Header */}
      <header className="bg-n-7 border-b border-n-6">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <h1 className="h4 text-color-1">AutoNation</h1>
            <span className="text-n-4">Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-n-3 text-sm">Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}</span>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "bg-n-7 border border-n-6",
                  userButtonPopoverActionButton: "text-n-1 hover:bg-n-6",
                  userButtonPopoverActionButtonText: "text-n-1",
                  userButtonPopoverFooter: "hidden"
                }
              }}
              afterSignOutUrl="/"
            />
          </div>
        </div>
      </header>

      <Section className="py-8">
        <div className="container">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="h2 mb-4">Welcome back, {user?.firstName || 'there'}!</h2>
            <p className="text-n-4">Here&#39;s what&#39;s happening with your Instagram automation.</p>
            {/* <p className="text-n-4">Here's what's happening with your Instagram automation.</p> */}

          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-n-7 p-6 rounded-2xl border border-n-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-n-3 text-sm font-medium">Total Replies</h3>
                <div className="w-2 h-2 bg-color-1 rounded-full"></div>
              </div>
              <p className="text-2xl font-bold text-n-1">{stats.totalReplies.toLocaleString()}</p>
              <p className="text-xs text-color-4 mt-1">+12% from last month</p>
            </div>

            <div className="bg-n-7 p-6 rounded-2xl border border-n-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-n-3 text-sm font-medium">Active Keywords</h3>
                <div className="w-2 h-2 bg-color-2 rounded-full"></div>
              </div>
              <p className="text-2xl font-bold text-n-1">{stats.activeKeywords}</p>
              <p className="text-xs text-color-4 mt-1">2 added this week</p>
            </div>

            <div className="bg-n-7 p-6 rounded-2xl border border-n-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-n-3 text-sm font-medium">Response Rate</h3>
                <div className="w-2 h-2 bg-color-4 rounded-full"></div>
              </div>
              <p className="text-2xl font-bold text-n-1">{stats.responseRate}%</p>
              <p className="text-xs text-color-4 mt-1">Above average</p>
            </div>

            <div className="bg-n-7 p-6 rounded-2xl border border-n-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-n-3 text-sm font-medium">Time Saved</h3>
                <div className="w-2 h-2 bg-color-6 rounded-full"></div>
              </div>
              <p className="text-2xl font-bold text-n-1">{stats.savedTime}h</p>
              <p className="text-xs text-color-4 mt-1">This week</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-n-7 p-6 rounded-2xl border border-n-6">
              <h3 className="h5 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-4 bg-n-8 rounded-lg border border-n-6 hover:border-color-1 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-n-1">Add New Keyword</span>
                    <span className="text-color-1">→</span>
                  </div>
                  <p className="text-sm text-n-4 mt-1">Set up automated responses for new triggers</p>
                </button>
                
                <button className="w-full text-left p-4 bg-n-8 rounded-lg border border-n-6 hover:border-color-1 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-n-1">View Analytics</span>
                    <span className="text-color-1">→</span>
                  </div>
                  <p className="text-sm text-n-4 mt-1">Check detailed performance metrics</p>
                </button>
                
                <button className="w-full text-left p-4 bg-n-8 rounded-lg border border-n-6 hover:border-color-1 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-n-1">Manage Templates</span>
                    <span className="text-color-1">→</span>
                  </div>
                  <p className="text-sm text-n-4 mt-1">Edit your automated response templates</p>
                </button>
              </div>
            </div>

            <div className="bg-n-7 p-6 rounded-2xl border border-n-6">
              <h3 className="h5 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-color-4 rounded-full mt-2"></div>
                  <div>
                    <p className="text-n-1 text-sm">Auto-replied to @user123</p>
                    <p className="text-n-4 text-xs">2 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-color-2 rounded-full mt-2"></div>
                  <div>
                    {/* <p className="text-n-1 text-sm">New keyword "pricing" added</p>
                     */}
                    <p className="text-n-1 text-sm">New keyword &quot;pricing&quot; added</p>
                    <p className="text-n-4 text-xs">1 hour ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-color-1 rounded-full mt-2"></div>
                  <div>
                    <p className="text-n-1 text-sm">Story mention auto-reply sent</p>
                    <p className="text-n-4 text-xs">3 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-color-6 rounded-full mt-2"></div>
                  <div>
                    <p className="text-n-1 text-sm">Weekly report generated</p>
                    <p className="text-n-4 text-xs">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Dashboard;