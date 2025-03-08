import time

start_time = time.time()


def get_uptime():
    """
    Returns the number of seconds since the program started.
    """
    return time.time() - start_time


def get_start_time():
    """
    Returns the server start time (in seconds since the Epoch)
    """
    return start_time
