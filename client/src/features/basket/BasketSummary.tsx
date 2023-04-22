import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { currencyFormat } from '../../app/util/Util';
import { useStoreContext } from '../../app/context/StoreContext';

export default function BasketSummary() {
  const { basket } = useStoreContext();

  const subtotal =
    basket?.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0) ?? 0;

  const deliveryFee = subtotal !== undefined && subtotal / 100 <= 100 ? 500 : 0;

  return (
    <>
      <TableContainer component={Paper} variant={'outlined'}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: 'italic' }}>*Orders over $100 qualify for free delivery</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}