import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Target, Users, DollarSign, AlertTriangle, Rocket } from 'lucide-react';
import { MarketGap } from '../../types/gap.types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useMVPGeneration } from '../../services/hooks/useAnalysis';

interface GapCardProps {
  gap: MarketGap;
}

export const GapCard: React.FC<GapCardProps> = ({ gap }) => {
  const [expanded, setExpanded] = useState(false);
  const [mvpData, setMvpData] = useState(null);
  
  const { mutate: generateMVP, isPending } = useMVPGeneration();

  const competitionVariant = {
    Low: 'success' as const,
    Medium: 'warning' as const,
    High: 'danger' as const,
  };

  const handleGenerateMVP = () => {
    generateMVP(gap.id, {
      onSuccess: (data) => setMvpData(data),
    });
  };

  return (
    <Card hover className="animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {gap.title}
          </h3>
          <Badge variant={competitionVariant[gap.competition]}>
            {gap.competition} Competition
          </Badge>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
        >
          {expanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </button>
      </div>

      <p className="text-gray-600 mb-4">
        {gap.reason}
      </p>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center text-blue-600 mb-1">
            <Target className="w-4 h-4 mr-1" />
            <span className="text-xs font-medium">Market Size</span>
          </div>
          <p className="font-semibold text-gray-900 text-sm">{gap.marketSize}</p>
        </div>

        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="flex items-center text-purple-600 mb-1">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-xs font-medium">Audience</span>
          </div>
          <p className="font-semibold text-gray-900 text-sm">{gap.targetAudience}</p>
        </div>

        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center text-green-600 mb-1">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className="text-xs font-medium">Revenue</span>
          </div>
          <p className="font-semibold text-gray-900 text-sm">{gap.estimatedRevenue}</p>
        </div>
      </div>

      {expanded && (
        <div className="mt-6 pt-6 border-t border-gray-200 space-y-6 animate-fade-in">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary-600" />
              Opportunity
            </h4>
            <p className="text-gray-600">{gap.opportunity}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
              Risk Factors
            </h4>
            <ul className="space-y-2">
              {gap.riskFactors.map((risk, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-600">
                  <span className="text-yellow-500 mr-2">⚠️</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Validation Sources</h4>
            <div className="flex flex-wrap gap-2">
              {gap.validationSources.map((source, idx) => (
                <Badge key={idx} variant="info">
                  {source}
                </Badge>
              ))}
            </div>
          </div>

          {!mvpData && (
            <Button
              onClick={handleGenerateMVP}
              isLoading={isPending}
              className="w-full"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Generate MVP Strategy
            </Button>
          )}

          {mvpData && (
            <div className="bg-gradient-to-r from-primary-50 to-purple-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-4">🚀 MVP Strategy Generated!</h4>
              {/* MVP content would go here */}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
