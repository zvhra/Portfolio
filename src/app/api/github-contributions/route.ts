import { NextResponse } from 'next/server';

export async function GET() {
  const username = 'zvhra'; // Your GitHub username
  
  try {
    // Using GitHub GraphQL API
    // Note: You'll need to set GITHUB_TOKEN in your environment variables
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      // If no token, return empty data (component will show placeholder)
      return NextResponse.json({ 
        contributions: [],
        totalContributions: 0,
        error: 'GitHub token not configured'
      });
    }

    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch contributions');
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    // Validate response structure before accessing nested properties
    if (!data.data || !data.data.user) {
      throw new Error('User not found or access denied');
    }

    const user = data.data.user;
    if (!user.contributionsCollection || !user.contributionsCollection.contributionCalendar) {
      throw new Error('Contributions data not available');
    }

    const contributionCalendar = user.contributionsCollection.contributionCalendar;
    const weeks = contributionCalendar.weeks;

    if (!weeks || !Array.isArray(weeks)) {
      throw new Error('Invalid contributions data structure');
    }

    const contributions: Array<{ date: string; count: number; level: number }> = [];

    interface ContributionDay {
      date: string;
      contributionCount: number;
    }

    interface Week {
      contributionDays: ContributionDay[];
    }

    weeks.forEach((week: Week) => {
      if (week && week.contributionDays && Array.isArray(week.contributionDays)) {
        week.contributionDays.forEach((day: ContributionDay) => {
          const level = day.contributionCount === 0 ? 0 :
                        day.contributionCount <= 3 ? 1 :
                        day.contributionCount <= 7 ? 2 :
                        day.contributionCount <= 15 ? 3 : 4;
          
          contributions.push({
            date: day.date,
            count: day.contributionCount,
            level,
          });
        });
      }
    });

    return NextResponse.json({
      contributions,
      totalContributions: contributionCalendar.totalContributions || 0,
    });
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    return NextResponse.json(
      { 
        contributions: [],
        totalContributions: 0,
        error: 'Failed to fetch contributions'
      },
      { status: 500 }
    );
  }
}

