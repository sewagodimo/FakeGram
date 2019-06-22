def jumpingOnClouds(c):
    clouds = []
    # step_count=0
    # [1,1,1,0,0,0,1,0,0,0,1]
    # clouds = [3,5 ]
    c = c.split(" ")
    for step in range(len(c) -1 ):
        if c[step] == 0:
            clouds.append(step)
            # check if it has a previous value
            index = len(clouds) -1
            print(index)
            if index >= 1:
                if clouds[index-1] + 1 == c[index]:

                    clouds.pop(index)

    return len(clouds)

def jumpingOnClouds2(c):
    clouds = []
    # step_count=0
    # [1,1,1,0,0,0,1,0,0,0,1]
    # clouds = [3,5 ]
    c = c.split(" ")
    for step in range(len(c)-1):
        if c[step] == '0':
            if step + 2 < len(c):
                clouds.append(step)
                # check if it has a previous value
                index = len(clouds) -1
                if index >= 1:
                    if clouds[index-1] + 1 == clouds[index]:
                        clouds.remove(clouds[index])
        else:
            clouds.append(-3)
    print(clouds)
    return len(clouds)


if __name__ == '__main__':
    c = "0 0 0 1 0 0"
    result = jumpingOnClouds2(c)
    print(result)
