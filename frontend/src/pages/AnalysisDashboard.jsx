import React from 'react'
import ATScoreCard from '../components/ATScoreCard'
import { Typography } from '@mui/material'

const AnalysisDashboard = () => {

  const report ={
    atsScore:82,
    strengths:[
      "Strong MERN Skills",
      "Good Projects"
    ],
    weaknesses:[
      "No InternShip"
    ],
    missingKeyword:[
      "Docker",
      "AWS"
    ],
    suggestions:[
      "Add Docker Project"
    ]

  }
  return (
    <div>
      <ATScoreCard score={report.atsScore} />
      
      <div>
        <Typography variant="h6">Strengths</Typography>
        <ul>
          {report.strengths.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <Typography variant="h6">Weaknesses</Typography>
      <ul>
        {report.weaknesses.map((weakness, index) => (
          <li key={index}>{weakness}</li>
        ))}
      </ul>
      
      <Typography variant="h6">Missing Keywords</Typography>
      <ul>
        {report.missingKeyword.map((keyword, index) => (
          <li key={index}>{keyword}</li>
        ))}
      </ul>
      
      <Typography variant="h6">Suggestions</Typography>
      <ul>
        {report.suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  )
}

export default AnalysisDashboard