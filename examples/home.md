# home.md

test messages

```Bash
test code
```

```plantuml
Foo -> Bar : messages
Foo <-- Bar
```

```plantuml
actor Promoter
actor Entrant

Promoter --> (Create Event)
Promoter -> (Attend Event)

Entrant --> (Find Event)
(Attend Event) <- Entrant

(Attend Event) <.. (Create Member)  : <<include>>
```
