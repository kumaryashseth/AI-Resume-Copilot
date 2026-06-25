import React, { useState } from 'react'
import { rewritePoint } from '../services/analysisService';
import {TextField, Button} from '@mui/material'

const ResumeRewriter = () => {
  
  const [point, setPoint] = useState('');
  const [result, setResult] = useState('');

  const handleRewrite = async () => {
    
    const res = await rewritePoint({bulletPoint: point});
    setResult(res.data.improved);
  }
  return (
    <div>
      <TextField
        label="Enter bullet point"
        value={point}
        onChange={(e) => setPoint(e.target.value)}
        multiline
        rows={4}
        fullWidth
      />
      <Button variant='contained' onClick={handleRewrite}>Rewrite</Button>
      
      <div className='mt-6 p-4 border'>
        {result}
      </div>
      </div>
  )
}

export default ResumeRewriter