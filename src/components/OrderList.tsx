import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import { Order } from '@core/models/order.model'
import { numberToCurrency } from 'src/lib/utils/number'
import { useOrderStateContext } from '@context/orderStateContext'

interface OrderListProps {
  title: string
  subtitle?: string
  orders: Order[]
}

const OrderList = ({ title, subtitle = '', orders }: OrderListProps) => {
  const { ordersToPay, toggleOrderToPay, checkIfCanAddOrderToPay } = useOrderStateContext()

  const handleToggle = (order: Order) => () => {
    toggleOrderToPay(order)
  }

  return (
    <Box component="div" mb={2}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ flexWrap: 'wrap' }}
        >
          <Typography variant="subtitle1" display="block" sx={{ width: '100%' }}>
            {title}
          </Typography>
          <Typography variant="caption" display="block">
            {subtitle}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{ paddingTop: 0 }}>
            {orders.map(order => {
              const canBeSelected = checkIfCanAddOrderToPay(order)
              return (
                <ListItem key={order.id} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={canBeSelected ? handleToggle(order) : undefined}
                    dense
                  >
                    <ListItemText
                      id={order.id}
                      primary={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginRight: '12px'
                          }}
                        >
                          <Box>
                            <Typography variant="body2" display="block">
                              {order.name}
                            </Typography>
                            <Typography variant="caption" display="block">
                              {order.dueText}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'end' }}>
                            <Typography
                              variant="body2"
                              component="span"
                              sx={{
                                textDecoration: order.savings ? 'line-through' : 'none',
                                color: order.savings ? '#828282' : 'inherit'
                              }}
                            >
                              {numberToCurrency(order.price, order.priceCurrency)}
                            </Typography>
                            {order.savings > 0 && (
                              <Typography variant="body2" component="span" ml={1}>
                                {numberToCurrency(order.price - order.savings, order.priceCurrency)}
                              </Typography>
                            )}
                            {order.status !== 'OUTSTANDING' && order.interest && (
                              <Typography variant="caption" display="block">
                                Interés: {numberToCurrency(order.interest, order.priceCurrency)}
                              </Typography>
                            )}
                            {order.savings > 0 && (
                              <Typography variant="caption" display="block">
                                Ahorras: {numberToCurrency(order.savings, order.priceCurrency)}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      }
                    />
                    {order.status !== 'PAID' && (
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={ordersToPay.indexOf(order) !== -1}
                          tabIndex={-1}
                          disabled={!canBeSelected}
                          disableRipple
                          inputProps={{ 'aria-labelledby': order.id }}
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
                        />
                      </ListItemIcon>
                    )}
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default OrderList
