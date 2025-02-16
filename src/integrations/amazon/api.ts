import { getAccessToken } from './auth';
import { supabase } from '@/integrations/supabase/client';
import axios from 'axios';

// Placeholder for Amazon API calls
const API_BASE_URL = 'https://advertising-api.amazon.com';
const API_VERSION = 'v2';

async function getCampaigns() {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      console.error('No access token available.');
      return null;
    }

    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/campaigns`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    // Consider more specific error handling based on the error type
    return null;
  }
}

async function mockGetAdGroups(campaignId: number) {
  // console.log(`Fetching ad groups for campaign ${campaignId} (mock data)...`);
  return [
    { id: 101, name: 'Mock Ad Group 1', campaignId },
    { id: 102, name: 'Mock Ad Group 2', campaignId },
  ];
}

// Placeholder function for syncing campaigns to Supabase
async function syncCampaignsToSupabase() {
  try {
    const campaigns = await getCampaigns(); // Use the new getCampaigns function
    if (!campaigns || !Array.isArray(campaigns) || campaigns.length === 0) { // Add check for array
      // console.warn('No campaigns to sync.');
      return;
    }

    for (const campaign of campaigns) {
      try {
        const { error: insertError } = await supabase
          .from('amazon_ads_metrics')
          .insert({
            campaign_id: String(campaign.id),
            campaign_name: campaign.name,
          });

        if (insertError) {
          console.error('Error inserting campaign:', insertError.message);
        }
      } catch (error) {
        console.error('Error inserting campaign:', error);
      }
    }

    // console.log('Mock campaigns synced to Supabase successfully.');
  } catch (error) {
    console.error('Error syncing campaigns:', error);
  }
}

export { getCampaigns, mockGetAdGroups as getAdGroups, syncCampaignsToSupabase };

// Placeholder function for making authenticated API requests