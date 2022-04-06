import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { stringAvatar } from '@utils/avatar'
import { School } from '@core/models/school.model'

interface SchoolHeaderProps {
  school: School
}

const SchoolHeader = ({ school }: SchoolHeaderProps) => {
  return (
    <Paper square>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} p={1} mb={2}>
        {school.logo ? (
          <Avatar src={school.logo} alt={school.name} sx={{ width: 48, height: 48 }} />
        ) : (
          <Avatar {...stringAvatar(school.name)} />
        )}
        <Typography variant="h2" display="block">
          {school.name}
        </Typography>
      </Box>
    </Paper>
  )
}

export default SchoolHeader
