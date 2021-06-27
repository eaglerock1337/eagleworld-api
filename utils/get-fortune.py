import json
import subprocess


def main():
    get_fortune = subprocess.Popen(
        ["curl", "api.eagleworld.net/fortune"],
        stdout=subprocess.PIPE
    )
    fortune = json.loads(get_fortune.stdout.read())
    print(f"Your fortune:\n{fortune['fortune']}")


if __name__ == "__main__":
    main()