import { Card, CardContent, Typography } from "@mui/material";

const DashboardCard = ({
  title,
  value,
  icon,
  color = "bg-white",
}) => {
  return (
    <Card className={`${color} shadow-lg rounded-xl`}>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h6">
              {title}
            </Typography>

            <Typography
              variant="h4"
              className="font-bold mt-2"
            >
              {value}
            </Typography>
          </div>

          <div className="text-4xl">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;