import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

async function scheduleOutfitNotification() {
  // await Notifications.cancelAllScheduledNotificationsAsync();
  const notifications = await Notifications.getAllScheduledNotificationsAsync();
  if (!notifications.length) {
    schedulePushNotification();
  }
}

async function schedulePushNotification() {
  const trigger = {
    repeats: true,
    hour: 20,
    minute: 0
  }
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Check out your proposed outfit 👕👟",
      // body: '',
      data: { data: '' },
    },
    trigger: trigger
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
  }
  if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;

  Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
  });

  return token;
}

export default {
  scheduleOutfitNotification,
}